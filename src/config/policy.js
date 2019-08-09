import aclStore from '../helper/acl-store'
// const aclMiddleware = aclStore.middleware

export default function permissions (req, res, next) {
  console.log(req.user)
  const acl = aclStore.acl
  console.log('TCL: permissions -> acl', acl)
  try {
    acl.isAllowed(req.user._id.toString(), req.path)
    next()
  } catch (error) {
    console.log('TCL: permissions -> error', error)
  }

  // const isAllowed = role => allowed.indexOf(role) > -1

  // // return a middleware
  // return (request, response, next) => {
  //   if (request.user && isAllowed(request.user.role)) {
  //     next()
  //   } // role is allowed, so continue on the next middleware
  //   else {
  //     response.status(403).json({ message: 'Forbidden' }) // user is forbidden
  //   }
  // }
}
