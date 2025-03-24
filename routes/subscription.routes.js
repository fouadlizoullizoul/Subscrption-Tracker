import { Router } from "express";

const SubscriptionRouter = Router();

SubscriptionRouter.get("/", (req, res) => {
  res.send({ message: "GET all subscriptions" });
});

SubscriptionRouter.get("/:id", (req, res) => {
  res.send({ message: "GET subscription details" });
});

SubscriptionRouter.post("/", (req, res) => {
  res.send({ message: "POST new subscription" });
});

SubscriptionRouter.put("/:id", (req, res) => {
  res.send({ message: "UPDATE subscription details" });
});

SubscriptionRouter.delete("/:id", (req, res) => {
  res.send({ message: "DELETE subscription" });
});

SubscriptionRouter.get("/user/:id", (req, res) => {
  res.send({ message: `GET all subscriptions for user ${req.params.id}` });
});

SubscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send({ message: "Cancel subscription" });
});

SubscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send({ message: "GET upcoming renewals" });
});
export default SubscriptionRouter;
