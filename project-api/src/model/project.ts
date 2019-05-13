'use strict'
import {ObjectId} from 'mongodb'

export interface Project{
    title: String,
    subtitle: String,
    description: String,
    type: String,
    tags: Array<String>,
    images: Array<String>
}