export const handler = async event => {
  switch(event.queryStringParameters.type) {
    case 'add':
      return {
        statusCode: 200,
        body: JSON.stringify({
          // 👇️ access query parameters on event object
          result: `The Addition of ${event.queryStringParameters.a} and ${event.queryStringParameters.b} is: ${parseInt(event.queryStringParameters.a)+parseInt(event.queryStringParameters.b)}`
        })
      }
    case 'sub':
      return {
        statusCode: 200,
        body: JSON.stringify({
          // 👇️ access query parameters on event object
          result: `The Subtraction of ${event.queryStringParameters.a} and ${event.queryStringParameters.b} is: ${parseInt(event.queryStringParameters.a)-parseInt(event.queryStringParameters.b)}`
        })
      }
    case 'mul':
      return {
        statusCode: 200,
        body: JSON.stringify({
          // 👇️ access query parameters on event object
          result: `The Multiplication of ${event.queryStringParameters.a} and ${event.queryStringParameters.b} is: ${parseInt(event.queryStringParameters.a)*parseInt(event.queryStringParameters.b)}`
        })
      }
    default: 
      return {
        statusCode: 400,
        body: 'No Type Found!'
      }
  }
};