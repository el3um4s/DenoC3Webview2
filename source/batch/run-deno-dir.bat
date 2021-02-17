echo OFF
SET position=%~dp0%
ECHO %position%
echo Set DENO_DIR position
set DENO_DIR=%position%deno_dir
@deno.exe "info" %*
echo Version
@deno.exe "--version" %*
echo Launch server
@deno.exe "run" "--allow-run" "--allow-read" "--allow-net" "mod.ts" %*
