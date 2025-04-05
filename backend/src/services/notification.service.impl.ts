import nodemailer from "nodemailer"
import { getLogger } from "../logger"
import { toTitleCase } from "../utils/strings"

const logger = getLogger("Mailer")

export default class NotificationService {
  private static transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.GMAIL_ACCOUNT,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
    secure: true,
    port: 465,
  })

  static async sendMaintenanceEmail(numbering: number): Promise<void> {
    try {
      await NotificationService.transporter.sendMail({
        from: process.env.GMAIL_ACCOUNT,
        to: process.env.ADMIN_EMAIL,
        subject: `IPC BIKE UPDATE: Bike #${numbering} Sent for Maintenance`,
        html: NotificationService.createMaintenanceEmailHtml(numbering),
        headers: {
          "List-Unsubscribe": "<mailto:ipcbikeapp@gmail.com>",
        },
      })
      logger.info("Maintenance email sent successfully")
    } catch (error) {
      logger.error("Failed to send maintenance email", error)
      throw new Error("Failed to send maintenance email")
    }
  }

  static async sendAccountApprovalEmail(
    userName: string,
    userRole: string
  ): Promise<void> {
    try {
      await NotificationService.transporter.sendMail({
        from: process.env.GMAIL_ACCOUNT,
        to: process.env.ADMIN_EMAIL,
        subject: `IPC BIKE UPDATE: New Account Pending Approval`,
        html: NotificationService.createAccountApprovalEmailHtml(
          userName,
          userRole
        ),
        headers: {
          "List-Unsubscribe": "<mailto:ipcbikeapp@gmail.com>",
        },
      })
      logger.info("Account approval email sent successfully")
    } catch (error) {
      logger.error("Failed to send account approval email", error)
      throw new Error("Failed to send account approval email")
    }
  }

  private static createMaintenanceEmailHtml(numbering: number): string {
    /* ---------------------- HTML template for email body ---------------------- */
    return `
      <div
        style="
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #fff;
          padding: 20px;
          max-width: 600px;
          margin: 0 auto;
          border-radius: 8px;
          border: 1px solid #ddd;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        ">
          <h1 style="font-size: 24px; color: #2c3e50; text-align: center">
            IPC Bike App
          </h1>
          <div style="font-size: 36px; color: #2c3e50; text-align: center">
            🚲 → <span style="font-size: 28px"> 🛠️</span>
          </div>
          <h3 style="font-size: 16px; color: #2c3e50; text-align: center">
            Bike #${numbering} has been sent for maintenance <br />
            and is now unavailable for bookings.
          </h3>
          <p style="font-size: 16px; margin-bottom: 15px">Dear Admin,</p>
          <p style="font-size: 16px; margin-bottom: 15px">
            This is a quick update to inform you that bike number
            <strong>#${numbering}</strong> has been sent for maintenance.
          </p>
          <p
            style="
              font-size: 16px;
              margin-bottom: 15px;
              padding: 15px;
              background-color: #fce5e5;
              border-left: 5px solid #e74c3c;
              color: #333;
              border-radius: 5px;
            ">
            <strong style="color: #e74c3c">Important:</strong> After the bike has
            been repaired, please remember to make it available again in the app by
            using the <strong>Inventory</strong> page at
            <strong>ipc.bike/secure/inventory</strong>
          </p>
          <p style="font-size: 16px; margin-top: 30px; font-weight: bold">
            Best regards,
          </p>
          <p style="font-size: 16px">IPC Bike App Support</p>
          <p
            style="
              font-size: 14px;
              color: #888;
              text-align: center;
              margin-top: 20px;
              font-style: italic;
            ">
            Note: This is an automated notification. Please do not reply to this
            message.
          </p>
      </div>
    `
  }

  private static createAccountApprovalEmailHtml(
    userName: string,
    userRole: string
  ): string {
    const userNameFormatted = toTitleCase(userName)
    const userRoleFormatted = toTitleCase(userRole)

    /* ---------------------- HTML template for email body ---------------------- */
    return `
          <div
      style="
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #fff;
        padding: 20px;
        max-width: 600px;
        margin: 0 auto;
        border-radius: 8px;
        border: 1px solid #ddd;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      ">
      <h1 style="font-size: 24px; color: #2c3e50; text-align: center">
        IPC Bike App
      </h1>
      <div style="font-size: 28px; color: #2c3e50; text-align: center">
        👤 → 🔓
      </div>
      <h3 style="font-size: 16px; color: #2c3e50; text-align: center">
        New user account requires approval
      </h3>
      <p style="font-size: 16px; margin-bottom: 15px">Dear Admin,</p>
      <p style="font-size: 16px; margin-bottom: 15px">
        A new user has registered on the IPC Bike App and is awaiting approval.
        Please review and activate the account to allow the user to access the
        system.
      </p>
      <p
        style="
          font-size: 16px;
          margin-bottom: 15px;
          padding: 15px;
          background-color: #fce5e5;
          border-left: 5px solid #e4980a;
          color: #333;
          border-radius: 5px;
        ">
        <strong style="color: #e4980a">Important:</strong> The user cannot log
        in or use the system until the account has been activated by an
        administrator. Account management can be done at
        <strong>ipc.bike/secure/accounts</strong>
      </p>
      <p style="margin-bottom: 15px; line-height: 1.6;">
        <strong style="font-size: 18px; color: #2c3e50;">Account Details:</strong>
        <div style="font-size: 16px; margin-top: 10px; padding-left: 10px;">
          <div style="margin-bottom: 8px;">
            <strong style="color: #2c3e50;">Name:</strong> 
            <span style="color: #555;">${userNameFormatted}</span>
          </div>
          <div>
            <strong style="color: #2c3e50;">Role:</strong> 
            <span style="color: #555;">${userRoleFormatted}</span>
          </div>
        </div>
      </p>
      <p style="font-size: 16px; margin-top: 30px; font-weight: bold">
        Best regards,
      </p>
      <p style="font-size: 16px">IPC Bike App Support</p>
      <p
        style="
          font-size: 14px;
          color: #888;
          text-align: center;
          margin-top: 20px;
          font-style: italic;
        ">
        Note: This is an automated notification. Please do not reply to this
        message.
      </p>
    </div>
    `
  }
}
