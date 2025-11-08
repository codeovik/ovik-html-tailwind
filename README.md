![website screenshort](https://ovikbiswas.wordpress.com/wp-content/uploads/2025/10/ovik-portfolio-html-tailwindcss.png)

OVIK is a Personal Portfolio website SASS template made for selling on Themeforest. Made with HTML and Tailwind CSS CLI.

### Links:
- [https://codeovik.github.io/ovik-html-tailwind/src](https://codeovik.github.io/ovik-html-tailwind/src)
- [https://ovik-html-tailwind.vercel.app](https://ovik-html-tailwind.vercel.app)

### Project timeline:
- 24 sep, 2025 - v1 released in github
- 28 September - 11 October, 2025 - Upload to Themeforest and hard rejected
- 12 October, 2025 - v2 start
- 30 October, 2025 - v2 end
- 03 november, 2025 - Upload to themeforest as 2nd try
- 05 november, 2025 - Delete uploaded theme and reupdated: nav link index, hero section animation off, font, image parallax, plan card and smooth scroll in button click & reupload to themeforest
- 05 - 08 november, 2025 - 2 Demo and major update and upload to themeforest

### To run this on locally:
1. Clone the repository and install dependencies
```bash
git clone https://github.com/codeovik/ovik-html-tailwind.git
cd ovik-html-tailwind
npm i
```

Run tailwind css compailor
```bash
npm run dev
```

### EmailJS HTML template code
Contact Template that will came to admin
``` html
<div style="font-family: system-ui, sans-serif, Arial; font-size:14px; max-width:500px; margin:0 auto; padding:24px; background:#fafafa; color:#111; border-radius:12px;">
  <!-- Header -->
  <div style="font-size:15px; margin-bottom:20px; line-height:1.4;">
    <strong>{{user_name}}</strong> just reached out through your portfolio website!
  </div>
  <!-- Card -->
  <div style="background:#f5f5f5; padding:20px; border-radius:10px; border: #ddd 3px solid;">
    <!-- Info Row -->
    <div style="display:flex; gap:15px; flex-wrap:wrap; margin-bottom:15px;">
      <div style="width:50px; height:50px; border-radius:10px; display:flex; justify-content:center; align-items:center; font-size:26px; background:#eee; flex-shrink:0;">
        👤
      </div>
      <div>
        <p style="margin:5px 0; font-size:15px;"><strong>Name:</strong> {{user_name}}</p>
        <p style="margin:5px 0; font-size:15px;"><strong>Company:</strong> {{user_company}}</p>
        <p style="margin:5px 0; font-size:15px;"><strong>Email:</strong> {{user_email}}</p>
        <p style="margin:5px 0; font-size:15px;"><strong>Phone:</strong> {{user_phone}}</p>
      </div>
    </div>
    <!-- Message -->
    <div style="border-top:1px dashed #ccc; margin-top:15px; padding-top:10px;">
      <p style="margin:0 0 5px 0;"><strong>💬 Message:</strong></p>
      <p style="background:#f3f3f3; padding:12px 15px; border-radius:8px; margin-top:10px; line-height:1.4;">{{user_message}}</p>
    </div>
    <!-- Action -->
    <div style="text-align:center; margin-top:15px;">
      <a href="mailto:{{user_email}}"
        target="blank"
        style="display:inline-block; text-decoration:none; color:#000; border:1px solid #000; padding:8px 14px; border-radius:8px; font-weight:bold;"
        onmouseover="this.style.background='#000'; this.style.color='#fff';"
        onmouseout="this.style.background=''; this.style.color='#000';">
        Reply now
      </a>
    </div>
  </div>
  <!-- Footer -->
  <div style="text-align:center; font-size:12px; opacity:0.7; margin-top:20px;">
    <p>This message was sent via your portfolio contact form.</p>
    <p><span style="font-weight:bold; color:#000;">CodeOVIK</span> - <em>Code Today, Rule Tomorrow</em></p>
  </div>
</div>
```
Auto replay that will go send to user
``` html
<div style="font-family: system-ui, sans-serif, Arial; font-size:14px; max-width:500px; margin:0 auto; padding:24px; background:#fafafa; color:#111111; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
  <!-- Header -->
  <div style="font-size:15px; margin-bottom:15px; line-height:1.4;">
    Hello <strong>{{user_name}}</strong>,
  </div>
  <!-- Message -->
  <div style="background:#f5f5f5; padding:20px; border-radius:10px; border: #ddd 3px solid;">
    Thank you for contacting me! I have received your message and I truly appreciate you reaching out.<br><br>
    I will review your message carefully and get back to you as soon as possible.<br><br>
    In the meantime, feel free to explore my portfolio or check out my latest projects. I look forward to connecting with you soon!
  </div>
  <!-- Footer -->
  <div style="font-size:12px; opacity:0.7; line-height:1.4;">
    Best regards,<br>
    <strong>CodeOVIK</strong><br>
    <em>Code Today, Rule Tomorrow</em>
  </div>
</div>
```