import { Resend } from 'resend';

const resend = new Resend("re_5Dx4HRVG_Crg5x1jCJoANaw4aW7DL7RsB");

export const sendVotingLink = async (email: string, votingLink: string) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'TrueVote <voting@yourdomain.com>',
      to: email,
      subject: 'Your TrueVote Voting Link',
      html: `
        <h2>Welcome to TrueVote!</h2>
        <p>Thank you for registering. Here's your secure voting link:</p>
        <a href="${votingLink}" style="
          background-color: #002868;
          color: white;
          padding: 12px 20px;
          text-decoration: none;
          border-radius: 4px;
          display: inline-block;
          margin: 20px 0;
        ">Access Voting Portal</a>
        <p>This link is unique to you. Please do not share it with others.</p>
      `
    });

    if (error) {
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
};
