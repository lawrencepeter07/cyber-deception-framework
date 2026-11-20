# 🌐 How to Host the Cyber Deception Framework

Your project is now fully unified: **the Express backend directly serves the React frontend, WebSockets, and MongoDB on one single port (5000)**!

Here are the 3 ways to host and share it right now:

---

## 📱 Method 1: Instant Wi-Fi / Local Network Hosting (No Setup Needed)

Because the server binds to `0.0.0.0:5000`, any phone, tablet, or laptop connected to your Wi-Fi can access it immediately!

1. Make sure your server is running (double click `start_dev.bat` or run `cd server && node server.js`).
2. Open your smartphone browser (connected to the same Wi-Fi) and type:
   - **Dashboard:** `http://172.100.2.71:5000`
   - **Decoy Admin Portal:** `http://172.100.2.71:5000/superadmin/portal`
3. Try logging in from your phone—watch your laptop dashboard immediately capture your phone's Wi-Fi IP and device model live!

---

## 🌍 Method 2: Instant Public Internet Tunnel (World-Wide Access in 5 Seconds)

Want to share a live link with someone on cellular data or in another city?

1. Double-click the file on your Desktop:
   👉 **`host_online.bat`**
2. It will automatically start the server and output a **public HTTPS link**, for example:
   ```text
   your url is: https://cyber-deception-demo.loca.lt
   ```
3. Send that link to anyone:
   - **Their link to the Honeypot:** `https://cyber-deception-demo.loca.lt/superadmin/portal`
   - **Your live Dashboard:** `https://cyber-deception-demo.loca.lt/`
*(Note: On the first visit to a `loca.lt` URL, it asks to confirm by entering your public IP, which it shows right on the page).*

---

## ☁️ Method 3: Permanent 24/7 Cloud Hosting (Render + MongoDB Atlas)

To keep it running 24/7 even when your laptop is turned off:

### 1. Free Cloud Database (MongoDB Atlas)
1. Go to **[mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)** and sign up for a free account.
2. Create a **Free Shared Cluster (M0)**.
3. Under **Database Access**, create a database user (e.g., `admin` / `password123`).
4. Under **Network Access**, click **Add IP Address** → **Allow Access from Anywhere (`0.0.0.0/0`)**.
5. Click **Connect** → **Drivers** and copy your connection string:
   ```text
   mongodb+srv://admin:password123@cluster0.xyz.mongodb.net/cyber_deception?retryWrites=true&w=majority
   ```

### 2. Free Cloud Web Service (Render.com)
1. Push your project folder to a GitHub repository.
2. Sign up at **[render.com](https://render.com/)** and click **New → Web Service**.
3. Select your GitHub repository:
   - **Root Directory:** leave blank (or `./`)
   - **Build Command:** `npm install && npm run build && cd server && npm install`
   - **Start Command:** `cd server && node server.js`
4. Under **Environment Variables**, add:
   - `PORT`: `5000`
   - `MONGO_URI`: *(Paste your MongoDB Atlas connection string from step 1)*
5. Click **Deploy Web Service**!
Render will give you a permanent `https://your-project.onrender.com` domain that runs 24/7.
