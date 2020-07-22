import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    hello: String
    getAllFreelancer(filter: String, first: Int!, offset: Int!): [Freelance]
    getAllFreelancerSelect: [Freelance]
    getAllProjects(filter: String, first: Int!, offset: Int!): [GetProject]
    getAllSkills: GetAllSkills
    getCountUserProject: GetCountUserProject
  }

  type GetCountUserProject {
    freelancers: Int!
    projects: Int!
  }

  type GetAllSkills {
    skills: [String]!
    count: [Int]!
  }

  type Freelance {
    id: ID!
    fullname: String!
    email: String!
    skillsets: [String]!
    location: String!
  }

  type GetProject {
    id: ID!
    projectname: String!
    payout: String!
    freelancers: [Freelance]!
  }

  type Project {
    id: ID!
    projectname: String!
    payout: String!
    freelancers: [String]!
  }

  type Mutation {
    createFreelancer(
      fullname: String!
      email: String!
      skillsets: [String]!
      location: String!
    ): Freelance
    updateFreelancer(
      id: ID!
      fullname: String!
      email: String!
      skillsets: [String]!
      location: String!
    ): Freelance
    removeFreelancer(id: ID!): Freelance

    createProject(projectname: String!, payout: String!, freelancers: [String]!): Project
    updateProject(id: ID!, projectname: String!, payout: String!, freelancers: [String]!): Project
    removeProject(id: ID!): Freelance
  }
`;
