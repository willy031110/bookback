import { model, Schema } from "mongoose";
import { Student } from "../../interfaces/Student";
import mongoose from 'mongoose';
mongoose.set('strictQuery', false); // 關閉嚴格模式
export const studentsSchemas = new Schema<Student>({
    //_id:{type: String, required:true},
    userName:{ type: String, required: true },
    sid:{ type: String, required: true },
    name:{ type: String, required: true },
    department:{ type: String, required: true },
    grade:{ type: String, required: true },
    class:{ type: String, required: true },
    Email:{ type: String, required: true },
    absences:{ type: Number, required: false,default: 0 },
});

export const studentsModel = model<Student>('studentlist', studentsSchemas,'studentlist');
