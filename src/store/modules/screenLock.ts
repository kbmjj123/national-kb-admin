import { defineStore } from 'pinia'
import { IS_SCREENLOCKED } from '@/store/mutation-types'
import { storage } from '@/utils/Storage'

const initTime = 60 * 60

const isLocked = storage.get(IS_SCREENLOCKED, false)

export type IScreenLockState = {
	isLocked: boolean,	// 是否锁屏的标识
	lockTime: number
}

export const useScreenLockStore = defineStore({
	id: 'app-screen-lock',
	state: (): IScreenLockState => {
		return {
			isLocked: isLocked === true,
			lockTime: isLocked === true ? initTime : 0
		}
	},
	actions: {
		setLock(payload: boolean){
			this.isLocked = payload
			storage.set(IS_SCREENLOCKED, this.isLocked)
		},
		setLockTime(payload = initTime) {
			this.lockTime = payload
		}
	}
})