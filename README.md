# blame-my-network

Check whether a website is up or down only for your network

[![Build Status](https://travis-ci.org/anubhavsrivastava/blame-my-network.svg?branch=master)](https://travis-ci.org/anubhavsrivastava/blame-my-network)
[![Coverage Status](https://coveralls.io/repos/github/anubhavsrivastava/blame-my-network/badge.svg?branch=master)](https://coveralls.io/github/anubhavsrivastava/blame-my-network?branch=master)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![GitHub issues](https://img.shields.io/github/issues/anubhavsrivastava/blame-my-network.svg?style=flat-square)](https://github.com/anubhavsrivastava/blame-my-network/issues)

[![NPM](https://nodei.co/npm/blame-my-network.png?downloads=true&stars=true)](https://nodei.co/npm/blame-my-network/)

## Installation

One time usage,

    $ npx blame-my-network http://theanubhav.com

    output:
    Connection successful from both, internal and external network.

Installing as global package

    $ npm i -g blame-my-network
    $ blamemynetwork http://theanubhav.com

    output:
    Connection successful from both, internal and external network.

## Usage

1.  Connection available for both outside world and on your network

        $ blamemynetwork http://theanubhav.com
        Connection successful from both, internal and external network.

2.  Connection available for only your network and not to external network. In case site is either not public, or you are on VPN, or accessing organisation internal site, or manually entry for DNS on host machine/router.

        $ blamemynetwork https://someinternalsite.com
        Only internal network could access the site.

3.  Your network couldn't access the site while external network could access the site and you should `blame your network` for this.

        $ blamemynetwork https://blamethenetworksite.com
        Blame you network. The external network can acess the site.

4.  Neither your network nor external network could access the site. Either site doesn't exists or is down for now

        $ blamemynetwork https://blamethenetworksite.com
        Connection failure from both, internal and external network.

## Known Issues

1. For URL with explicit port : eg, abc.com:9080, xyz.pqr.com:8080 will be reported as not available from external network
2. Domains not responding to http(or port 80, returning 302 or HSTS header) would be reported as not available from external network

## Contribution

Suggestions and PRs are welcome!

Please create issue or open PR request for contribution.

## License

[![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](LICENSE)

refer `LICENSE` file in this repository.
