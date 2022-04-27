import ProfileStatus from "./ProfileStatus";
import {create} from 'react-test-renderer'

describe('ProfileStatus component', () => {
    test('status from props should be in state', () => {
        const component = create(<ProfileStatus status={'test status'}/>)
        const instance = component.getInstance()
        expect(instance?.state.status).toBe('test status')
    })
    test('after rendering should be a <span> element', () => {
        const component = create(<ProfileStatus status={'test status'} />)
        const root = component.root
        let span = root.findByType('span')
        expect(span).not.toBeNull()
    })
    test("after rendering shouldn't be an <input> element", () => {
        const component = create(<ProfileStatus  status={'test status'} />)
        const root = component.root
        expect( () => {
            let input = root.findByType('input')
        }).toThrow()
    })
    test('input should be displayed in edit mode instead of span', () => {
        const component = create(<ProfileStatus status={'test status'} />)
        const root = component.root
        let span = root.findByType('span')
        span.props.onDoubleClick()
        let input = root.findByType('input')
        expect(input.props.value).toBe('test status')
    })
    test('callback should be called', () => {
        let mockCallback = jest.fn()
        const component = create(<ProfileStatus status={'test status'} updateStatus={mockCallback} />)
        let instance = component.getInstance()
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1)
    })
})