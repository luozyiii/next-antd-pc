import { useCallback, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { DndContext, PointerSensor, useSensor } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Upload } from "antd";
// import api from '@/api';
import DraggableUploadListItem from "./DraggableUploadListItem";
import styles from "./index.module.scss";
import type { DragEndEvent } from "@dnd-kit/core";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";

type CustomeUploadProps = UploadProps & {
  value?: UploadFile[];
  onChange?: (value: UploadFile[]) => void;
};

// 自定义表单的一种实现
const Comp = ({
  maxCount = 1,
  value: fileList = [],
  onChange,
  ...other
}: CustomeUploadProps) => {
  const [loading, setLoading] = useState(false);

  const sensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });

  const onDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      if (active.id !== over?.id) {
        const activeIndex = fileList?.findIndex((i) => i.uid === active.id);
        const overIndex = fileList?.findIndex((i) => i.uid === over?.id);
        const newValue = arrayMove(fileList, activeIndex, overIndex);
        onChange?.(newValue);
      }
    },
    [fileList, onChange]
  );

  const handleOnChange: UploadProps["onChange"] = useCallback(
    ({ fileList: newFileList }: any) => {
      newFileList = newFileList.slice(0);
      newFileList = newFileList.map((file: UploadFile) => {
        if (file.response) {
          file.url = file.response.url;
        }
        return file;
      });
      onChange?.(newFileList);
    },
    [onChange]
  );

  const customRequest = useCallback(async ({ file, onSuccess }: any) => {
    setLoading(true);
    const data = new FormData();
    data.append("type", "PRIVATELY");
    data.append("file", file);
    data.append("fileName", file?.name);
    // const res = await api.common.upload(data);
    // onSuccess(res.data?.data);
    setLoading(false);
  }, []);

  return (
    <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
      <SortableContext
        items={fileList?.map((i) => i.uid)}
        strategy={verticalListSortingStrategy}
      >
        <Upload
          {...other}
          className={styles.uploadBox}
          maxCount={maxCount}
          listType="picture-card"
          fileList={fileList.slice(0, maxCount)}
          onChange={handleOnChange}
          customRequest={customRequest}
          itemRender={(originNode, file) => (
            <DraggableUploadListItem originNode={originNode} file={file} />
          )}
        >
          {fileList.length >= maxCount ? null : (
            <div>
              {loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div style={{ marginTop: 8 }}>上传</div>
            </div>
          )}
        </Upload>
      </SortableContext>
    </DndContext>
  );
};

export default Comp;
