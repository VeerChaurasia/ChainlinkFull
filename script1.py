import imaplib
import email
from email.policy import default
import os

# Load email account credentials from environment variables for security
EMAIL = "decentralized.smartoracle@gmail.com"
PASSWORD = 'hwrohightvnlgjfn'
IMAP_SERVER = 'imap.gmail.com'

def download_email(save_dir):
    try:
        # Connect to the email server
        mail = imaplib.IMAP4_SSL(IMAP_SERVER)
        mail.login("decentralized.smartoracle@gmail.com", 'hwrohightvnlgjfn')
        mail.select('inbox')

        # Search for the email
        status, data = mail.search(None, 'ALL')
        email_ids = data[0].split()

        # Fetch the latest email by ID
        email_id = email_ids[-1]  # Get the latest email
        status, data = mail.fetch(email_id, '(RFC822)')

        raw_email = data[0][1]

        # Save the email as an .eml file in the specified directory
        eml_file_path = os.path.join(save_dir, 'latest_email.eml')
        with open(eml_file_path, 'wb') as eml_file:
            eml_file.write(raw_email)

        print(f"Email saved as {eml_file_path}")

        return eml_file_path

    except imaplib.IMAP4.error as e:
        print(f"Authentication failed: {e}")

def read_eml_file(file_path):
    with open(file_path, 'rb') as eml_file:
        raw_email = eml_file.read()
    return email.message_from_bytes(raw_email, policy=default)

def display_email_content(msg):
    print("=== Email Headers ===")
    for header in msg.keys():
        print(f"{header}: {msg[header]}")

    dkim_signature = msg.get('DKIM-Signature')
    if dkim_signature:
        print("\n=== DKIM Signature ===")
        print(dkim_signature)

    print("\n=== Email Body ===")
    if msg.is_multipart():
        for part in msg.iter_parts():
            if part.get_content_type() == 'text/plain':
                print(part.get_payload(decode=True).decode())
            elif part.get_content_type() == 'text/html':
                print(part.get_payload(decode=True).decode())
    else:
        print(msg.get_payload(decode=True).decode())

if __name__ == "__main__":
    # Define the directory to save the .eml files in the home directory
    save_directory = os.path.expanduser('~/emails')  # This will resolve to /home/username/emails on Linux or C:\Users\username\emails on Windows

    # Create the directory if it doesn't exist
    if not os.path.exists(save_directory):
        os.makedirs(save_directory)

    eml_file_path = download_email(save_directory)
    if eml_file_path:
        email_message = read_eml_file(eml_file_path)
        display_email_content(email_message)
