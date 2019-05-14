import { Document, Model, model, Schema } from 'mongoose';
import {Project} from '../model/project';

export interface ProjectModel extends Project, Document {}

export const ProjectSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: String,
    description: String,
    type: String,
    tags: [String],
    images: [String]
});

export const ProjectModel: Model<ProjectModel> = model<ProjectModel>('Project', ProjectSchema);
