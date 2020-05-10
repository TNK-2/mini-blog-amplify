import Vue from 'vue';
import { IArticle } from '~/interfaces/api/Article';
import API, { graphqlOperation, GraphQLResult } from '@aws-amplify/api';
import { listPosts } from '../graphql/queries';
import { createPost } from '../graphql/mutations';
import { ListPostsQuery, CreatePostInput } from '~/interfaces/api/API';

/**
 * stateのインターフェース
 */
export interface IState {
  articles: IArticle[];
}
 
export const state = (): IState => ({
  articles: [],
});

export const getters = {
  getArticle: (state: IState) => (id: string): IArticle | undefined => {
    return state.articles.find((article) => article.id === id);
  },
};

export const mutations = {
  saveArticles(state: IState, articles: IArticle[]) {
    state.articles = articles;
  },
};

export const actions = {
  async fetchArticles(this: Vue, { commit }: any) {
    const result = await API.graphql(graphqlOperation(listPosts, {
      type: "post",
      sortDirection: 'DESC',
      limit: 20, //default = 10
    }));
    if ("data" in result && result.data) {
        const articles = result.data as ListPostsQuery;
        commit('saveArticles', articles.listPosts?.items);
    }
  },

  async postArticle(this: Vue, _: any, createPostInput: CreatePostInput) {
    console.log(createPostInput);
    createPostInput.type = 'post'
    // await this.$axios.$post(ENDPOINTS.ARTICLES, payload);
    const res = await API.graphql(graphqlOperation(createPost, { 
      input: createPostInput
    })); 
  }
};
