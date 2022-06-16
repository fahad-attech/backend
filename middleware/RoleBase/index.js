const { User, Todos, Group, Permission, UserRole } = require("../../models");
const methods = {
  PUT: "UPDATE",
  POST: "ADD",
  GET: "READ",
  DELETE: "DELETE",
};
const can = () => {
  return async (req, res, next) => {
    try {
      // extract user from request.
      const { userId } = req.user;
      const method = req.method;
      const path = req.baseUrl.split("/")[1];
      const mappedMethod = methods[method];
      console.log(req.method, mappedMethod);
      //check if it is a Valid User.
      const isValidUser = await User.findByPk(userId);
      if (!isValidUser) {
        return res.status(401).send("You are unauthorized.");
      }

      const userPermissions = await Permission.findAll({
        include: [
          {
            model: Group,
            // attributes: [],
            include: {
              model: User,
              attributes: [],
              where: {
                id: userId,
              },
            },
          },
        ],
      });

      const isAuthorized = userPermissions.find((permission) => {
        return permission.name == mappedMethod && permission.grant == path;
      });
      console.log("isAuthorized", isAuthorized);
      if (!isAuthorized) {
        return res.status(500).send("You are unauthorized.");
      }
      req.isAccessAllowed = true;
      next();
    } catch (error) {
      res.status(500).send(`Error ${erorr.message}`);
    }
  };
};

module.exports = can;
