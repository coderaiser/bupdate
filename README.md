# Bupdate

Update bower dependecy and change `bower.json` if version is bigger.

For npm you could use [nupdate](https://github.com/coderaiser/nupdate "Nupdate").

Same as:

```sh
bower install <module> --save && bower uninstall <module> --save
```

## Install

```
npm i bupdate -g
```

## How to use?

```sh
bupdate jquery
```

### Options

```
Usage: bupdate [options]
Options:
  -h, --help                  display this help and exit
  -v, --version               display version and exit
  -E, --save-exact            save exact version rather then semver
```

## License

MIT

