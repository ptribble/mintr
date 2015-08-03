# Mintr

This fork of mintr is for systems running illumos, replacing the Linux-specific code present in the original. The modifications made are minimal, just enough to make it work.

![Screenshot](http://i.imgur.com/7gYEhQ3.png)

Mintr is a simple unix monitoring tool.  It intentially avoids authentication, and thus does not monitor or display any private information, nor does it allow any actions to be taken from the web interface.

It, quite simply, shows a few graphs that should help indicate the current status of your server, as well as the status over the past hour.

Currently it shows

* Memory usage
* CPU Usage
* Network activity
* Process memory usage & CPU usage

You can see a demo at http://mintr.kevinbedi.com

# Installation & Usage

```
git clone https://github.com/ptribble/mintr.git
npm install ./mintr
./node_modules/.bin/mintr
```

Note that you have to make sure you point npm install at the checkout from git, as an unqualified `npm install mintr` will install the Linux original.

If you do not have nodejs/npm, you'll need to install that first.  See https://nodejs.org/ for instructions on this.

`mintr` takes an optional parameter which is the port it runs on, so you can run `mintr 1337` if you want to run it on port `1337`.  The default port is `3000`.
You can run `mintr` in a screen/tmux, add it to your system's startup, or anything else you please.
Then go to `http://your-server.com:3000`, or replace `3000` with the correct port.
