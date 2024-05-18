import { defineStore } from 'pinia'
import { store } from '../index'
import { CateType, getCategoryList } from '@/api/product/category.ts'

interface CategoryState{
	categoryList: CateType[]
}

const useCategoryStore = defineStore({
	id: 'app-category',
	state: (): CategoryState => ({
		categoryList: []
	}),
	getters: {
		getCategoryList(): CateType[] {
			return this.categoryList
		}
	},
	actions: {
		async getCategoryListAction() {
			const res = await getCategoryList()
			this.categoryList = res.data
			return this.categoryList
		}
	}
})

export function useCategory() {
	return useCategoryStore(store)
}