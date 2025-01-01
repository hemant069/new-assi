import React, { useState } from 'react'
import { Modal, Input, Select, Checkbox, Button, Card, Avatar } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { students } from "../../utils/data"

const ModalFn = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStudents, setSelectedStudents] = useState([])
    const [searchText, setSearchText] = useState('')

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // For the Select 

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedStudents(students.map(student => student.id))
        } else {
            setSelectedStudents([])
        }
    }
    const handleStudentSelect = (studentId, checked) => {
        if (checked) {
            setSelectedStudents([...selectedStudents, studentId])
        } else {
            setSelectedStudents(selectedStudents.filter(id => id !== studentId))
        }
    }

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchText.toLowerCase())
    )
    return (
        <div>
            <Button onClick={showModal}>Click Me !</Button>
            <Modal title={
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Sign-In</h2>
                    <h3 className="text-lg">Select Students</h3>
                </div>
            }
                width={800}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[

                ]}
            >
                <div className="space-y-4">

                    <div className="flex gap-4 items-center">
                        <Input
                            placeholder="Search Students"
                            prefix={<SearchOutlined />}
                            value={searchText}
                            onChange={e => setSearchText(e.target.value)}
                            className="flex-1"
                        />
                        <Select
                            placeholder="Select Classroom"
                            className="w-48 outline-none"
                            options={[
                                { value: 'class1', label: 'Class 1' },
                                { value: 'class2', label: 'Class 2' },
                            ]}
                        />
                        <Select
                            placeholder="Select Tag"
                            className="w-48"
                            options={[
                                { value: 'tag1', label: 'Tag 1' },
                                { value: 'tag2', label: 'Tag 2' },
                            ]}
                        />
                        <p className=" border px-4 rounded-sm bg-gray-200 text-center text-blue-500">
                            Active
                        </p>
                    </div>

                    <Checkbox
                        checked={selectedStudents.length === students.length}
                        indeterminate={selectedStudents.length > 0 && selectedStudents.length < students.length}
                        onChange={e => handleSelectAll(e.target.checked)}


                    >
                        Select All
                    </Checkbox>

                    <div className="grid grid-cols-3 gap-4">
                        {filteredStudents.map(student => (
                            <Card
                                key={student.id}
                                className={`cursor-pointer transition-colors ${selectedStudents.includes(student.id) ? 'bg-blue-50' : ''
                                    }`}
                                onClick={() => handleStudentSelect(student.id, !selectedStudents.includes(student.id))}
                            >
                                <div className="flex items-center gap-3">
                                    <Avatar src={student.image} size={40} />
                                    <span className="flex-1">{student.name}</span>
                                    <Checkbox
                                        checked={selectedStudents.includes(student.id)}
                                        onClick={e => e.stopPropagation()}
                                        onChange={e => handleStudentSelect(student.id, e.target.checked)}
                                    />
                                </div>
                            </Card>
                        ))}

                    </div>
                </div>
                <div className='flex gap-2 mt-5 justify-center'>
                    <Button className='w-[15rem]  py-6' key="cancel" onClick={() => setIsModalOpen(false)}>
                        Cancel
                    </Button>,
                    <Button

                        key="continue"
                        type="primary"
                        className="w-[15rem] py-6 bg-blue-500"
                        onClick={() => setIsModalOpen(false)}
                    >
                        Continue
                    </Button>


                </div>
            </Modal>
        </div>
    )
}

export default ModalFn