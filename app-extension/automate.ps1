$port = 9000
# Find the process listening on the specified port
$processInfo = Get-NetTCPConnection -State Listen |
               Where-Object { $_.LocalPort -eq $port } |
               Select-Object -ExpandProperty OwningProcess -Unique

if ($processInfo) {
    $process = Get-Process -Id $processInfo -ErrorAction SilentlyContinue
    if ($process) {
        Write-Host "Found process on port $port with PID $($process.Id)"

        # Get the command line used to start the process
        $commandLine = (Get-WmiObject Win32_Process -Filter "ProcessId = $($process.Id)").CommandLine
        Write-Host "Command line: $commandLine"

        # Now kill the process
        $process | Stop-Process -Force
        Write-Host "Process terminated successfully."

        # After killing the process, find and close the window by other means (command line, etc.)
        # This is still conceptual as PowerShell directly does not close windows by command line
        # Additional scripting or tools might be required to link command line to window handle
    } else {
        Write-Host "No process found with the specified ID on port $port."
    }
} else {
    Write-Host "No server process found on port $port."
}

Push-Location

# Navigate to the library directory and build it
Write-Host "Navigate to the library directory and build it"
# Set-Location -Path "C:\Users\lc\Projects\TestProjects\quasar\create-quasar\test2\app-extension"
try {
    # Execute the first npx command to build into buildRuntime folder
    Write-Host "Running first npx command..."
    & npx mkdist ./ --ext=js --declaration --pattern='**' --pattern='!shims-vue.d.ts' --pattern='!templates/**'
    # & pnpm run build:code
    # & npx mkdist --src ./src/runtime --dist buildRuntime --ext=js --declaration --pattern='**/!(shims-vue.d.ts)'
    if ($LASTEXITCODE -ne 0) {
        throw "First npx command failed."
    }
    Write-Host "First npx command completed successfully."

    # Add a small delay to ensure the file system settles
    Start-Sleep -Seconds 2

    # Execute the second npx command to build into the dist folder
    Write-Host "Running second npx command..."
    & npx mkdist ./ --src ./src/templates --dist ./dist/templates --loaders='raw'
    # & pnpm run build:templates
    # & npx mkdist ./ --format=cjs --declaration --pattern '**' --pattern '!runtime'
    if ($LASTEXITCODE -ne 0) {
        throw "Second npx command failed."
    }
    Write-Host "Second npx command completed successfully."

    # Move the buildRuntime folder into dist as runtime
    # Write-Host "Moving buildRuntime into dist as runtime..."
    # Move-Item -Path buildRuntime -Destination dist/runtime -Force
    # if ($LASTEXITCODE -ne 0) {
        # throw "Moving buildRuntime folder failed."
    # }
    # Write-Host "Move completed successfully."
} catch {
    Write-Host "Build failed: $_"
    Pop-Location
    exit
}


# Navigate to the consuming app directory and update the library
Write-Host "Navigate to the consuming app directory and update the library";
Set-Location -Path "..\playground\quasar-cli-vite"
try {
    & pnpm run update-lib
} catch {
    Write-Host "Update failed: $_"
    Pop-Location
    exit
}

$scriptBlock = {
    # Command to start the development server goes here
    $host.UI.RawUI.WindowTitle='DevServerUI'
    pnpm run dev-restart
}

# Start a new PowerShell process with the window title set immediately
Start-Process powershell -ArgumentList "-NoExit", "-Command $scriptBlock"

Pop-Location

Write-Host "Library updated. Dev server is running in a new window."
