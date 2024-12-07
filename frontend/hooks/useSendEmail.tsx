export const sendEmail = async (to: string, subject: string, message: string) => {
    try {
      const response = await fetch("/api/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to, subject, message }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to send email");
      }
  
      const data = await response.json();
      return data;
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };