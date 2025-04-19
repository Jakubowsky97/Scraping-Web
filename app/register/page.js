"use client";
import { useRegisterMutation } from "@/features/auth/authApi";
import AuthForm from "@/features/auth/components/AuthForm";
import React from "react";

const RegisterPage = () => {
  return (
    <div>
      <AuthForm type="register" operation={useRegisterMutation} />
    </div>
  );
};

export default RegisterPage;
