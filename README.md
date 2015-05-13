This repository is for testing TCMS case #231596.

The server.js file is a standard node.js server.
A node\_modules dir and package.json file were created.
The package.json is augmented to include the websockets npm package, ws.
Lastly, a local npm install of ws was performed.

This was done so as not to have to install npm and ws on each slave machine,
As well as the fact that a user does not have access to installing npm
packages on a diy gear.
