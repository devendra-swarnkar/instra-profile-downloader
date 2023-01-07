import instaloader
import sys
app = instaloader.Instaloader()
username = sys.argv[1]
app.download_profile(username, profile_pic_only=True)