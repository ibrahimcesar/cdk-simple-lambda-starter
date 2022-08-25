# 🌴 CDK v2 Simple Lambda HTTP ApiGateway Model

// TBD

## Beware export lambda

In the file `src/lambda/index.ts`, the exported name for the lambda handler is **not dynamic**, so it can be configurable, you'll need to add your own, each time. This is because, `import` and `export` statements are specifically designed this way because they have to be statically analyzable, i.e. the import and export names have to be known before the code is executed.

### TODO

- [ ] Lambda Versions
- [ ] Lambda Alias
- [ ] Stacks for Dev and Prod
