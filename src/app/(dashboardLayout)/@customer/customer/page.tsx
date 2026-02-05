import { redirect } from "next/navigation";
import React from "react";

const CustomerPage = () => {
  redirect("/customer/profile");

  return null;
};

export default CustomerPage;
