import { h } from 'vue'
import { type DataTableColumns, NImage } from 'naive-ui'

export const productColumns: DataTableColumns = [
  {
    title: '商品编码',
    key: 'slug',
		align: 'center'
  },
  {
    title: '商品名称',
    key: 'name',
  },
	{
		title: '商品图片',
		key: 'masterPic',
		render: (rowData) => {
			return h(NImage, { src: rowData.masterPicture as string, width: '60px', height: '60px' })
		}
	},
	{
		title: '购买数量',
		key: 'quantity',
		align: 'center'
	},
  {
    title: '小计(¥)',
    key: 'subTotal',
  },
]