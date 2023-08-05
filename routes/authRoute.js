import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//  REGISTER || METHOD POST
// normally we write cal back function but in MVC patern
// we write in conrollers
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//Forget password || POST
router.post("/forgot-password", forgotPasswordController);
//test routs
router.get("/test", requireSignIn, isAdmin, testController);

//protected user rout auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected Admin rout auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update Profile
router.put("/profile", requireSignIn, updateProfileController);

// order
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

//order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
