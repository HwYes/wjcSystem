<template>
    <div>
        <a-button
            size="large"
            class="editable-add-btn"
            @click="visible = true"
        >
            <a-icon type="plus" />
            新增员工
        </a-button>
        <a-table
            :loading="loading"
            :columns="columns"
            :data-source="data"
            bordered
            rowKey="id"
        >
            <template
                v-for="col in ['name', 'principle','id']"
                :slot="col"
                slot-scope="text, record, index"
            >
                <div :key="col">

                    <template>

                        {{ text }}
                    </template>
                </div>
            </template>
            <template
                slot="operation"
                slot-scope="text, record, index"
            >
                <router-link :to="'/warehouse/' + index">
                    <a-icon type="bar-chart" /> 库存管理
                </router-link>
            </template>
        </a-table>

        <a-modal
            title="新增仓库"
            :visible="visible"
            @ok="submit"
            @cancel="visible = false"
        >
            <a-input
                v-model="form.name"
                addon-before="仓库名称"
                style="width: 300px;margin-bottom: 20px"
            ></a-input>
            <a-input
                v-model="form.principle"
                addon-before="仓库负责人"
                style="width: 300px"
            ></a-input>
        </a-modal>
    </div>
</template>

<script>
import { FindAllWarehouse, SaveWarehouse } from "@/api/warehouse";

export default {
    name: "WareHouse",
    data() {
        return {
            columns: [
                {
                    title: '仓库Id',
                    dataIndex: 'id',
                    scopedSlots: { customRender: 'id' },
                },
                {
                    title: '仓库名称',
                    dataIndex: 'name',
                    scopedSlots: { customRender: 'name' },
                },
                {
                    title: '负责人',
                    dataIndex: 'principle',
                    scopedSlots: { customRender: 'principle' },
                },


                {
                    title: '操作',
                    dataIndex: 'operation',
                    scopedSlots: { customRender: 'operation' },
                },
            ],
            loading: false,
            visible: false,
            form: { id: '', principle: '', name: '' },
            spinning: false,
            data: [
                { id: '1', principle: '3213123', name: '123' }
            ],
            imgList: [
                require('../../assets/warehouse0.svg'),
                require('../../assets/warehouse1.svg'),
                require('../../assets/warehouse2.svg'),]
        }
    },

    mounted() {
        this.loadData()
    },

    methods: {

        loadData() {
            this.spinning = true
            FindAllWarehouse().then((res) => {
                if (res.status) this.data = res.data
                setTimeout(() => {
                    this.spinning = false
                }, 600)
            })
        },

        submit() {
            SaveWarehouse(this.form).then((res) => {
                if (res.status) this.$message.success("添加成功")
                this.visible = false
                this.loadData()
            })
            // this.data.push(JSON.parse(JSON.stringify(this.form)))
            // this.visible = false
        }

    },

}
</script>

<style scoped>
.editable-add-btn {
    margin-bottom: 15px;
}
.add-item {
    text-align: center;
    line-height: 120px;
    min-height: 120px;
    border: 1px dashed #91949c;
}

.add-item:hover {
    border: 1px dashed #5a84fd;
    color: #5a84fd;
}

.item {
    margin-bottom: 20px;
}

.image {
    width: 80px;
    height: 80px;
}
.card-tools {
    display: flex;
    width: 100%;
    flex-direction: row;
    flex-wrap: nowrap;
    border-bottom: 1px solid #ccc;
    height: 30px;
    box-sizing: border-box;
    margin-bottom: 15px;
}
.card-tools .tool {
    position: relative;
    flex: 1;
    text-align: center;
}
.card-tools .tool:nth-child(1)::after {
    position: absolute;
    top: 0;
    right: 0;
    content: "";
    width: 1px;
    height: 20px;
    background: #ccc;
}
.card-tools .tool:hover {
    color: #40a9ff;
}
</style>