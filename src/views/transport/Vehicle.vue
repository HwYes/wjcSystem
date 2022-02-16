<template>
    <div>
        <a-button
            size="large"
            class="editable-add-btn"
            @click="visible = true"
        >
            <a-icon type="plus" />
            添加车辆
        </a-button>

        <a-table
            :loading="loading"
            :columns="columns"
            :data-source="data"
            bordered
            rowKey="id"
        >
            <template
                v-for="col in ['number','id']"
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
                slot="type"
                slot-scope="text, record, index"
            >

                {{ text }}

            </template>
            <template
                slot="driving"
                slot-scope="text, record, index"
            >
                <a-tag :color=" driving ? 'orange': 'green'">{{ driving ? '正在途中' : '正在休息' }}</a-tag>
                <span>使用记录</span>
            </template>
        </a-table>

        <a-modal
            title="新增仓库"
            :visible="visible"
            @ok="submit"
            @cancel="visible = false"
        >
            <a-form-model :model="form">
                <a-form-model-item label="车牌号码">
                    <a-input v-model="form.number" />
                </a-form-model-item>
                <a-form-model-item label="车辆类型">
                    <a-select v-model="form.type">
                        <a-select-option value="小型汽车">小型汽车</a-select-option>
                        <a-select-option value="货车">货车</a-select-option>
                        <a-select-option value="卡车">卡车</a-select-option>
                    </a-select>
                </a-form-model-item>
            </a-form-model>
        </a-modal>
    </div>
</template>

<script>

import { FindAllVehicle, SaveVehicle } from "@/api/vehicle";

export default {
    name: "WareHouse",
    data() {
        return {
            loading: false,
            columns: [
                {
                    title: '车牌号码',
                    dataIndex: 'number',
                    scopedSlots: { customRender: 'number' },
                },
                {
                    title: '车辆类型',
                    dataIndex: 'type',
                    scopedSlots: { customRender: 'type' },
                },

                {
                    title: '状态',
                    dataIndex: 'driving',
                    scopedSlots: { customRender: 'driving' },
                },
            ],
            visible: false,
            spinning: false,
            form: {
                number: '京A0000',
                type: '货车',
                driving: false,
            },
            data: [{
                number: '京A0000',
                type: '货车',
                driving: false,
            }],
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
            FindAllVehicle().then((res) => {
                if (res.status) this.data = res.data
                setTimeout(() => {
                    this.spinning = false
                }, 600)
            })
        },

        submit() {
            SaveVehicle(this.form).then((res) => {
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
    margin-left: 20px;
}
</style>