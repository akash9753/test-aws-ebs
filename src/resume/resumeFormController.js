import ResumeForm from './resumeFormModel.js'; // Import the updated model


export const createResume = async (req, res) => {
    try {
      console.log('Request body:', req.body);
      
      // Directly destructure the body for better readability
      const {
        resumeName,
        userId,
        firstName,
        lastName,
        middleName,
        dob,
        contactNo,
        emailId,
        websiteLink,
        linkedinLink,
        currentAddress,
        nativePlace,
        education,
        experience,
        skills,
        profileSummary,
        language,
        hobbies,
        personalProject,
        images
      } = req.body;
  
      // Create a new ResumeForm instance
      const newResume = new ResumeForm({
        resumeName,
        userId,
        firstName,
        lastName,
        middleName,
        dob,
        contactNo,
        emailId,
        websiteLink,
        linkedinLink,
        currentAddress,
        nativePlace,
        education, // Array of education objects
        experience, // Array of experience objects
        skills, // Array of skill objects
        profileSummary, // Array of profileSummary objects
        language, // Array of language objects
        hobbies, // Array of hobby objects
        personalProject, // Object containing personal project details
        images: images || "", // Default to empty string if no images are provided
      });
  
      // Save the new resume to the database
      const savedResume = await newResume.save();
  
      // Respond with success
      res.status(201).json({
        success: true,
        message: "Resume Form Information Saved Successfully.",
        ResumeData: savedResume,
      });
    } catch (error) {
      // Handle errors
      res.status(500).json({ success: false, message: error.message });
      console.error('Error saving resume:', error);
    }
  };
  


export const getAllResumesByUserId = async (req, res) => {
  try {
    console.log(req.params);
    const userId = req.params.id; 
    console.log(userId);
    const resumes = await ResumeForm.find({ userId: userId });
    const total= resumes.length;
    res.status(200).json({success:true,message:"",total:total,allResumeByUserId:resumes});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getResumeResumeId = async (req, res) => {
  try {
    console.log(req.params);
    const resumeId = req.params.id; 
    console.log(resumeId);
    const resume = await ResumeForm.findOne({ _id: resumeId });

   
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    res.status(200).json({success:true,message:"",resumeById:resume});
  } catch (error) {
    res.status(500).json({ success:false, message: error.message });
  }
};

export const deleteByResumeId = async (req, res) => {
  try {
    const resumeId = req.params.id; 
    const deletedResume = await ResumeForm.findByIdAndRemove(resumeId);

    if (!deletedResume) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    res.status(200).json({ success: true, message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const updateResume = async (req, res) => {
  try {
    const { formData, image } = req.body; // Destructure formData and image from req.body
    const resumeId = req.params.id;
    const data = JSON.parse(formData);
    // Define the update data
    console.log(data);
    const updateData = {
      ...data, // Include formData
      images: image, // Update the images field with the new image
    };
    console.log(updateData);
    // Find the resume by ID and update it
    const updatedResume = await ResumeForm.findByIdAndUpdate(
      resumeId,
      updateData,
      { new: true } // Return the updated document
    );
    console.log(updateResume);
    if (!updatedResume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    res.status(200).json({ success: true, message: 'Resume updated successfully', updatedResume });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
