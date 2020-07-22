import { Freelancer, Project } from './mongoose';
import * as loadash from 'lodash';
import moment from 'moment';

export const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    getAllFreelancer: async (_: any, { filter, first, offset }: any) => {
      try {
        let query = {};
        query = { deletedAt: null };
        if (filter) {
          query = { email: { $regex: `${filter}`, $options: 'i' }, deletedAt: null };
        }

        const freelance = await Freelancer.find(query).skip(offset).limit(first);
        return freelance;
      } catch (e) {
        console.log(e);
      }
    },
    getAllFreelancerSelect: async (_: any, {}: any) => {
      try {
        const freelance = await Freelancer.find({ deletedAt: null });
        return freelance;
      } catch (e) {
        console.log(e);
      }
    },
    getAllProjects: async (_: any, { filter, first, offset }: any) => {
      try {
        let query = {};
        query = { deletedAt: null };
        if (filter) {
          query = { projectname: { $regex: `${filter}`, $options: 'i' }, deletedAt: null };
        }

        const project = await Project.find(query).populate('freelancers').skip(offset).limit(first);
        return project;
      } catch (e) {
        console.log(e);
      }
    },
    getAllSkills: async (_: any, {}: any) => {
      try {
        const skillsRaw = await Freelancer.find({ deletedAt: null }).select('skillsets');
        let skillsArray: any[] = [];

        for (const skill of skillsRaw) {
          for (const s of skill.skillsets) {
            skillsArray.push(s);
          }
        }

        skillsArray = skillsArray.sort();

        const frequency = loadash.map(loadash.groupBy(skillsArray), (r: string | any[]) => ({
          value: r[0],
          frequency: r.length,
        }));

        let skills: String[] = [];
        let count: Number[] = [];

        await frequency.map((r) => {
          skills.push(r.value);
          count.push(r.frequency);
        });

        return { skills, count };
      } catch (e) {
        console.log(e);
      }
    },
    getCountUserProject: async (_: any, {}: any) => {
      try {
        const freelancers = await Freelancer.count({ deletedAt: null });
        const projects = await Project.count({ deletedAt: null });

        return {
          freelancers,
          projects,
        };
      } catch (e) {
        console.log(e);
      }
    },
  },
  Mutation: {
    createFreelancer: async (_: any, { fullname, email, skillsets, location }: any) => {
      try {
        const freelancer = new Freelancer({
          fullname,
          email,
          skillsets,
          location,
        });

        await freelancer.save();
        return freelancer;
      } catch (e) {
        console.log(e);
      }
    },
    updateFreelancer: async (_: any, { id, fullname, email, skillsets, location }: any) => {
      try {
        const freelancer = new Freelancer({
          id,
          fullname,
          email,
          skillsets,
          location,
        });

        await Freelancer.updateOne({ _id: id }, [
          { $set: { fullname, email, skillsets, location } },
        ]);

        return freelancer;
      } catch (e) {
        console.log(e);
      }
    },
    removeFreelancer: async (_: any, { id }: any) => {
      try {
        const freelancer = new Freelancer({
          id,
        });
        const dateNow = moment().format('YYYY-MM-DD HH:mm:ss');
        await Freelancer.updateOne({ _id: id }, [{ $set: { deletedAt: dateNow } }]);

        return freelancer;
      } catch (e) {
        console.log(e);
      }
    },
    createProject: async (_: any, { projectname, payout, freelancers }: any) => {
      try {
        const project = new Project({
          projectname,
          payout,
          freelancers,
        });

        await project.save();
        return project;
      } catch (e) {
        console.log(e);
      }
    },
    updateProject: async (_: any, { id, projectname, payout, freelancers }: any) => {
      try {
        const project = new Project({
          id,
          projectname,
          payout,
          freelancers,
        });

        await Project.updateOne({ _id: id }, [{ $set: { projectname, payout, freelancers } }]);

        return project;
      } catch (e) {
        console.log(e);
      }
    },
    removeProject: async (_: any, { id }: any) => {
      try {
        const project = new Project({
          id,
        });
        const dateNow = moment().format('YYYY-MM-DD HH:mm:ss');
        await Project.updateOne({ _id: id }, [{ $set: { deletedAt: dateNow } }]);

        return project;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
