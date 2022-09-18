<script lang="tsx">
  import { computed, CSSProperties, defineComponent, unref } from 'vue'
  import type { PropType } from 'vue'
  import type { Placement } from 'element-plus'
  import { InfoFilled } from '@element-plus/icons-vue'
  import { isArray, isString } from '/@/utils/is'
  import { getSlot } from '/@/utils/helper/tsxHelper'

  export default defineComponent({
    name: 'BasicHelp',
    props: {
      content: {
        type: [Array, String] as PropType<string[] | string>,
        default: '',
      },
      placement: {
        type: String as PropType<Placement>,
        default: 'right',
      },
      color: {
        type: String,
        default: '#fff',
      },
      fontSize: {
        type: String,
        default: '14px',
      },
      showIndex: {
        type: Boolean,
        default: true,
      },
    },
    setup(props, { slots }) {
      const getTooltipStyle = computed((): CSSProperties => {
        return {
          color: props.color,
          fontSize: props.fontSize,
        }
      })

      function renderTitle() {
        const contentList = props.content

        if (isString(contentList)) {
          return <p>{contentList}</p>
        }

        if (isArray(contentList)) {
          return contentList.map((content, index) => {
            return (
              <p key={content}>
                <span>{props.showIndex ? `${index + 1}. ` : ''}</span>
                <span>{content}</span>
              </p>
            )
          })
        }

        return null
      }

      // content={renderTitle()}
      return () => {
        return (
          <el-tooltip
            v-slots={{
              content: () => {
                return <div style={unref(getTooltipStyle)}>{renderTitle()}</div>
              },
            }}
            placement={unref(props.placement)}
          >
            <el-icon>
              <span class="pl-2 cursor-pointer">{getSlot(slots) || <InfoFilled />}</span>
            </el-icon>
          </el-tooltip>
        )
      }
    },
  })
</script>
