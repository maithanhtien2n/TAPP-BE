const AUTH_TOKEN = require("./authenticateToken");
const AUTH_PRO_TOOL = require("./authenticateProTool");

const onRouteCustom = (
  app,
  controllerName,
  method,
  route,
  handler,
  role = "USER"
) => {
  app[method](
    `/api/v1/${controllerName}${route}`,
    AUTH_TOKEN(role).authenticateToken,
    handler
  );
};

module.exports = { onRouteCustom, authenticateProTool: AUTH_PRO_TOOL };
