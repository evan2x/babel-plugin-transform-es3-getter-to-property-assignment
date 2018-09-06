import template from "babel-template";

const buildProperty = template(`
  $0[$1] = $2;
`);

export default function ({ types: t }) {
  return {
    visitor: {
      CallExpression: {
        exit(path) {
          // Only Object.defineProperty for processing
          if (
            !(path.get('callee').isMemberExpression()
            && t.isIdentifier(path.node.callee.object, { name: 'Object' })
            && t.isIdentifier(path.node.callee.property, { name: 'defineProperty' }))) return;

          if (
            path.node.arguments.length === 3
            && t.isObjectExpression(path.node.arguments[2])
            && Array.isArray(path.node.arguments[2].properties)
            && !path.node.arguments[2].properties.some((n) => {
              return t.isIdentifier(n.key, { name: 'set' });
            })
          ) {
            const FunctionDecl = path.node.arguments[2].properties.find((n) => {
              return t.isIdentifier(n.key, { name: 'get' });
            });

            if (FunctionDecl && FunctionDecl.value) {
              if (path.node.arguments[1].value != null) {
                const node = buildProperty(
                  path.node.arguments[0],
                  t.stringLiteral(path.node.arguments[1].value),
                  t.callExpression(t.parenthesizedExpression(FunctionDecl.value), [])
                );

                path.replaceWith(node);
              }
            }
          }
        }
      }
    }
  };
}
