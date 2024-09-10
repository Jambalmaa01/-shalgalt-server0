const Class = require('../model/classModel');
const asyncHandler = require('../middlewares/asyncHandler');

const createClass = asyncHandler(async (req, res) => {
    const { className, teacherName, userId } = req.body;

    const newClass = await Class.create({
        className,
        teacherName,
        userId
    });

    res.status(200).json({
        success: true,
        data: newClass
    });
});

const getClass = asyncHandler(async (req, res) => {
    const allClass = await Class.find();
    res.status(200).json({
        success: true,
        data: allClass
    });
});

const deleteClass = asyncHandler(async (req, res) => {
    const classId = req.params.id;

    if (!classId) {
        return res.status(400).json({ success: false, message: 'No class ID provided' });
    }

    try {
        const deletedClass = await Class.findByIdAndDelete(classId);

        if (!deletedClass) {
            return res.status(404).json({ success: false, message: 'Class not found' });
        }

        res.status(200).json({ success: true, data: deletedClass });
    } catch (error) {
        console.error('Error during delete:', error); // For debugging
        res.status(500).json({ success: false, message: 'Error deleting class' });
    }
});



const editClass=asyncHandler(async(req, res)=>{
    try{
        const cId =req.params.id
        const classId=await Class.findByIdAndUpdate(cId, req.body, {new:true})
        if(!classId){
            res.status(404).json({success:false, message:'oldsongvv'})
        }
        res.status(200).json({success:true, data:classId})
    
       }catch(error){
        console.error(error)
        res.status(500).json({
            success:false,
            error:'amjiltgvv'
        })
       }
})

module.exports = {
    createClass,
    getClass,
    deleteClass,
    editClass
};
