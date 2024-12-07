export const ResetPasswordMessageTemplateLiteral = (token:string) => `
Dear User,<br/><br/>
Please , Click on the link below to reset your password.<br/><br/>
<a class="reset-button" href="${process.env.NEXT_PUBLIC_FRONTEND_URL}/password-reset/${token}" style="padding: 10px 20px; background-color: #f97316; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a><br/><br/>
`;