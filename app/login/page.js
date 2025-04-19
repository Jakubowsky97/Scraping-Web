"use client";

import { useLoginMutation } from "@/features/auth/authApi";
import AuthForm from "@/features/auth/components/AuthForm";
import React from "react";

const LoginPage = () => {
  return (
    <div>
      <AuthForm type="login" operation={useLoginMutation} />
    </div>
  );
};

export default LoginPage;
