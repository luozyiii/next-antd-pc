'use client';

import { Fragment, createElement, forwardRef, useCallback, useImperativeHandle } from 'react';
import { omitBy } from 'lodash-es';
import { Col, Form, Row } from 'antd';
import formItem from '../form/item';
import type { FormDisplayRule, RecordType } from '@/types';
import type { FormInstance, FormItemProps, FormProps } from 'antd';

interface FItemProps extends Omit<FormItemProps, 'shouldUpdate'> {
  type: keyof typeof formItem;
  label: string;
  name: string;
  shouldUpdate?: boolean | string[] | ((prevValues: RecordType, currentValues: RecordType) => boolean);
  displayRules?: FormDisplayRule[]; // 与 shouldUpdate 搭配使用，控制其显示隐藏
  span?: number;
  colType?: 'default' | 'large';
  cProps?: RecordType;
}

interface FProps extends FormProps {
  fields: FItemProps[];
  grid?: boolean; // grid 布局
  responsive?: boolean; // 是否启动响应式, grid = true 使用
}

export interface FormRef extends FormInstance {
  reset: () => void;
}

const FormWarp = (
  { fields, grid = false, responsive = false, initialValues = {}, ...other }: FProps,
  ref: React.Ref<FormRef>,
) => {
  const [form] = Form.useForm();

  // 区别于resetFields，仅仅重置 values
  const resetFiledsValues = useCallback(() => {
    const values: RecordType = {};
    fields.forEach((field) => {
      if (initialValues && initialValues[field.name]) {
        values[field.name] = initialValues[field.name];
      } else {
        values[field.name] = undefined;
      }
    });
    form.setFieldsValue(values);
  }, [fields, form, initialValues]);

  const isShow = useCallback((displayRules: FormDisplayRule[], getFieldValue: (name: string) => unknown) => {
    let isDisplayNum = 0;
    const len = displayRules?.length;
    for (let index = 0; index < len; index++) {
      const rule = displayRules[index];
      if (!rule) continue;

      const fieldValue = getFieldValue(rule.field);

      // 简化的值比较逻辑
      if (Array.isArray(rule.value) && rule.value.includes(fieldValue)) {
        isDisplayNum++;
      } else if (rule.value === fieldValue) {
        isDisplayNum++;
      }
    }
    return len === isDisplayNum;
  }, []);

  // 暴露的方法
  useImperativeHandle(ref, () => ({
    ...form,
    getFieldsValue: () => {
      const params = form.getFieldsValue(true);
      // 只剔除null、undefined; 不剔除空字符串
      return omitBy(params, function (item) {
        return item === null || item === undefined;
      });
    },
    validateFields: async () => await form.validateFields(),
    resetFields: () => form.resetFields(),
    setFieldsValue: (values: RecordType) => form.setFieldsValue(values),
    reset: resetFiledsValues,
  }));

  return (
    <Form form={form} initialValues={initialValues} {...other}>
      {!grid &&
        fields?.map(({ type, cProps, shouldUpdate, displayRules, name, ...itemProps }, index) => {
          if (formItem[type]) {
            if (['switch'].includes(type)) {
              itemProps.valuePropName = 'checked';
            }
            if (shouldUpdate && displayRules) {
              return (
                <Fragment key={name || `field-${index}`}>
                  <Form.Item
                    noStyle
                    shouldUpdate={
                      shouldUpdate as boolean | ((prevValues: RecordType, currentValues: RecordType) => boolean)
                    }
                  >
                    {({ getFieldValue }) => {
                      if (isShow(displayRules, getFieldValue)) {
                        return (
                          <Form.Item {...itemProps}>{createElement(formItem[type] as React.FC, cProps)}</Form.Item>
                        );
                      }
                      return null;
                    }}
                  </Form.Item>
                </Fragment>
              );
            } else {
              return (
                <Fragment key={name || `field-${index}`}>
                  <Form.Item
                    shouldUpdate={
                      shouldUpdate as boolean | ((prevValues: RecordType, currentValues: RecordType) => boolean)
                    }
                    {...itemProps}
                  >
                    {createElement(formItem[type] as React.FC, cProps)}
                  </Form.Item>
                </Fragment>
              );
            }
          } else {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <Fragment key={`fallback-${index}`}>
                <Form.Item label="待开发组件">-</Form.Item>
              </Fragment>
            );
          }
        })}
      {grid && (
        <Row gutter={12}>
          {fields?.map(
            ({ type, cProps, shouldUpdate, displayRules, span, colType = 'default', name, ...itemProps }, index) => {
              // 响应式布局
              const responsiveObj = responsive
                ? {
                    xs: { span: 24 },
                    md: { span: colType === 'default' ? 12 : 24 },
                    lg: { span: colType === 'default' ? 8 : 16 },
                    xl: { span: colType === 'default' ? 6 : 12 },
                    xxl: { span: colType === 'default' ? 4 : 8 },
                  }
                : undefined;

              if (formItem[type]) {
                if (['switch'].includes(type)) {
                  itemProps.valuePropName = 'checked';
                }
                if (shouldUpdate && displayRules) {
                  return (
                    <Col key={name || `field-${index}`} span={span} {...responsiveObj}>
                      <Form.Item
                        noStyle
                        shouldUpdate={
                          shouldUpdate as boolean | ((prevValues: RecordType, currentValues: RecordType) => boolean)
                        }
                      >
                        {({ getFieldValue }) => {
                          if (isShow(displayRules, getFieldValue)) {
                            return (
                              <Form.Item {...itemProps}>{createElement(formItem[type] as React.FC, cProps)}</Form.Item>
                            );
                          }
                          return null;
                        }}
                      </Form.Item>
                    </Col>
                  );
                } else {
                  return (
                    <Col key={name || `field-${index}`} span={span} {...responsiveObj}>
                      <Form.Item
                        shouldUpdate={
                          shouldUpdate as boolean | ((prevValues: RecordType, currentValues: RecordType) => boolean)
                        }
                        {...itemProps}
                      >
                        {createElement(formItem[type] as React.FC, cProps)}
                      </Form.Item>
                    </Col>
                  );
                }
              } else {
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <Col key={`fallback-${index}`} span={span} {...responsiveObj}>
                    <Form.Item label="待开发组件">-</Form.Item>
                  </Col>
                );
              }
            },
          )}
        </Row>
      )}
    </Form>
  );
};

export default forwardRef(FormWarp);
