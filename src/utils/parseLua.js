// src/utils/parseLua.js
import luaparse from 'luaparse';

let completeCode = {}

export function parseLuaFile(luaCode) {
  try {

    completeCode = luaCode

    const ast = luaparse.parse(luaCode, { locations: true, ranges: true });
    const functions = [];
    const variables = [];
    const tables = [];

    const extractNodes = (node) => {
      if (node.type === 'AssignmentStatement') {
        node.variables.forEach((variable, i) => {
          if (variable.type === 'Identifier' && !variable.global) {
            const valueNode = node.init[i];
            if (valueNode && valueNode.type === 'TableConstructorExpression') {
              variables.push({
                name: variable.name,
                value: 'table',
                elements: valueNode.fields.map(field => ({
                  key: field.key ? field.key.name : null,
                  value: field.value.raw || field.value.name || 'undefined'
                }))
              });
            } else {
              variables.push({
                name: variable.name,
                value: valueNode ? valueNode.raw || valueNode.name : 'undefined',
              });
            }
          }
        });
      } else if (node.type === 'FunctionDeclaration') {
        // Use start and end positions directly to slice function body code
        const functionBodyCode = extractFunctionBodyDirectly(luaCode, node.range[0], node.range[1]);
        
        // Initialize return value placeholder
        let returnValue = 'undefined'; // Default value if no return found

        // Check for return statements within the function body
        const returnStatements = findReturnStatements(node.body);
        if (returnStatements.length > 0) {
          returnValue = returnStatements.map(returnNode => 
            returnNode.arguments.map(arg => arg.raw || arg.name || 'undefined').join(', ')
          ).join(' | '); // Format multiple return values
        }

        functions.push({
          name: node.identifier ? node.identifier.name : 'anonymous',
          parameters: node.parameters.map(param => param.name),
          code: functionBodyCode,
          returnValue, // Include return value in the function object
        });
      }

      if (node.body) node.body.forEach(extractNodes);
      if (node.statements) node.statements.forEach(extractNodes);
    };

    const extractFunctionBodyDirectly = (code, start, end) => {
      return code.slice(start, end).trim();
    };

    const findReturnStatements = (body) => {
      const returnStatements = [];
      const searchNode = (node) => {
        if (node.type === 'ReturnStatement') {
          returnStatements.push(node);
        }
        if (node.body) node.body.forEach(searchNode);
        if (node.statements) node.statements.forEach(searchNode);
      };
      if (body) {
        body.forEach(searchNode);
      }
      return returnStatements;
    };

    extractNodes(ast);
    return {
      functions: { isOpen: false, items: functions },
      variables: { isOpen: false, items: variables },
      tables: { isOpen: false, items: tables },
      code: { isOpen: false, items: completeCode },
    };
  } catch (error) {
    console.error("Error parsing Lua code:", error);
    return {
      functions: { isOpen: false, items: [] },
      variables: { isOpen: false, items: [] },
      tables: { isOpen: false, items: [] },
      code: { isOpen: false, items: completeCode },
    };
  }
}
