const express = require('express');
const router = express.Router();
const axios = require('axios'); 
const useragent = require('express-useragent');
router.use(useragent.express());
router.get("/getIp",async(req,res)=>{
    try { 
        let ip =
          req.headers["cf-connecting-ip"] ||
          req.headers["x-real-ip"] ||
          req.headers["x-forwarded-for"] ||
          req.socket.remoteAddress; 
        
        const source = req.headers["user-agent"];
        const ua = useragent.parse(source);
     
        const geoResponse = await axios.get(`https://ipapi.co/${ip}/json/`);
        const geoData = geoResponse.data;
    
        // 4. Construct Response Object
        const userDetails = {
          ip: ip,
          browser: ua.browser,
          version: ua.version,
          os: ua.os,
          platform: ua.platform,
          country: geoData.country_name || "Unknown",
          region: geoData.region || "Unknown",
          city: geoData.city || "Unknown",
        };
    
        res.json(userDetails);
      } catch (error) {
        console.error("Error fetching user details:", error.message);
        res.status(500).json({ error: "Error fetching user details" });
      }
})

module.exports = router;