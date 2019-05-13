'use strict'

export interface Project{
    id: String,
    title: String,
    subtitle: String,
    description: String,
    type: String,
    tags: Array<String>,
    images: Array<String>
}