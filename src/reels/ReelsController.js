
import { s3, PutObjectCommand } from "../config/asw.js";
import Reel from "./ReelsModel.js"


 
  
  export const uploadVideo = async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No video file uploaded' });
    }
    // console.log(req);
    
    const { 
      title, 
      description, 
      category, 
      subcategory, 
      tags 
    } = req.body;
  
    // Generate a unique filename
    const fileName = `${Date.now()}-${req.file.originalname}`;
  
    const params = {
      Bucket: process.env.bucket,
      Key: fileName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };
  
    try {
      // Upload to S3
      await s3.send(new PutObjectCommand(params));
  
      // Create new Reel document
      const newReel = new Reel({
        videoLink: `https://${process.env.bucket}.s3.amazonaws.com/${fileName}`,
        title,
        description,
        category,
        subcategory,
        tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
        uploadedBy: req.auth.userId, // Assuming you have user authentication middleware
      });
  
      await newReel.save();
  
      res.status(201).json({
        message: 'Video uploaded successfully',
        reel: newReel,
      });
    } catch (error) {
      console.error('Error uploading video:', error);
      res.status(500).json({ error: 'Error uploading video' });
    }
  };
  
  