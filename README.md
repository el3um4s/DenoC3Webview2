# DenoC3Webview2
_Construct 3, DenoJS and Microsoft Edge WebView2_

This is a very, very, very experimental project! I am trying to use [Deno](https://deno.land/), [Construct 3](https://www.construct.net/en) and [Microsoft Edge WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/) together. This test computes arithmetic operations of random numbers. But to do this it uses two tools still in development:

- [Experimental new lightwighy windows wrapper](https://www.construct.net/en/forum/construct-3/general-discussion-7/experimental-new-lightweight-158536#forumPost1035547) (Construct 3)
- [Compiling Executables](https://deno.land/manual@master/tools/compiler) (Deno)

There are 3 different versions of the same project:

- [Webview only](https://github.com/el3um4s/DenoC3Webview2/releases/download/v0.0.2/webview.zip) (533KB)
- [Webview and Deno_Dir](https://github.com/el3um4s/DenoC3Webview2/releases/download/v0.0.2/webview-and-deno_dir.zip)(1MB)
- [Webview and Deno](https://github.com/el3um4s/DenoC3Webview2/releases/download/v0.0.2/webview-and-denojs.zip)(8.22MB)


**This is only for Windows 64-bit!**

Probably the first time it may be necessary to install "Microsoft Edge WebView2" on your pc. If you are connected to the internet this will happen automatically. Otherwise, you can download and install it manually from [Microsoft](https://developer.microsoft.com/en-us/microsoft-edge/webview2/).

### Webview only

![Webview Only](/assets/folder-webview-only.jpg)

It requires to have Deno already installed on the pc. You also need an internet connection to download the Deno modules.

To launch click on **"run.bat"** or from console/shell use:

```
deno.exe run --allow-run --allow-read --allow-net mod.ts
```

It may be necessary to [force the download](https://deno.land/manual@v1.7.4/linking_to_external_code/reloading_modules#reloading-modules) of the necessary modules with:
```
deno.exe run --allow-run --allow-read --allow-net --reload mod.ts
```

### Webview and Deno_Dir

![Webview and Deno_Dir](/assets/folder-webview-and-deno-dir.jpg)

It requires to have Deno already installed on your pc. You don't need an internet connection.

To launch click on **"run.bat"**

### Webview and Deno

![Webview and Deno](/assets/folder-webview-and-deno.jpg)

You don't need Deno. And You don't need any internet connection. Click on **"run.exe"** to launch.
