import { useEffect, useState } from 'react';
import { Modal, Steps, Form, Input, Button, message } from 'antd';
import authService from '../../services/auth.service';
import PropTypes from 'prop-types';

const { Step } = Steps;

const ChangePasswordModal = ({ visible, onCancel }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        if (!visible) {
            setCurrentStep(0);
            form.resetFields();
        }
    }, [visible]);

    const handleVerifyPassword = async (values) => {
        try {
            setLoading(true);
            await authService.verifyPassword({
                username: authService.getUsername(),
                password: values.currentPassword
            });
            setVerified(true);
            setCurrentStep(1);
            message.success('Password verified successfully');
        } catch (error) {
            console.log(error)
            message.error('Incorrect current password');
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (values) => {
        try {
            setLoading(true);
            await authService.changePassword({
                username: authService.getUsername(),
                password: values.newPassword
            });
            message.success('Password changed successfully');
            onCancel();
            form.resetFields();
        } catch (error) {
            console.log(error)
            message.error('Failed to change password', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Change Password"
            visible={visible}
            onCancel={onCancel}
            footer={null}
            destroyOnClose
            width={750}
        >
            <Steps current={currentStep} className="mb-10 mt-12">
                <Step title="Verify Password" />
                <Step title="Set New Password" />
            </Steps>

            {currentStep === 0 && (
                <Form form={form} onFinish={handleVerifyPassword} className='mt-16 mb-5'>
                    <Form.Item
                        name="currentPassword"
                        label="Current Password"
                        rules={[{ required: true, message: 'Please input your current password!' }]}
                    >
                        <Input.Password placeholder="Enter current password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} className='mt-5'>
                            Verify Password
                        </Button>
                    </Form.Item>
                </Form>
            )}

            {currentStep === 1 && (
                <Form form={form} onFinish={handleChangePassword}>
                    <Form.Item
                        name="newPassword"
                        label="New Password"
                        rules={[{ required: true, message: 'Please input your new password!' }]}
                    >
                        <Input.Password placeholder="Enter new password" />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        label="Confirm Password"
                        dependencies={['newPassword']}
                        rules={[
                            { required: true, message: 'Please confirm your password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Confirm new password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Change Password
                        </Button>
                        <Button className="ml-2" onClick={() => setCurrentStep(0)}>
                            Back
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </Modal>
    );
};
ChangePasswordModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default ChangePasswordModal;