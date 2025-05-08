
import Site from '../Site.jsx';
import { render, screen, fireEvent } from '@testing-library/react';
import toSafeId from '../Pages/ShipSection/BuildRocket/MagicForum/Shared/SafeId.js';

export async function testInstance(){
    const OuterSpace2 = (await import('../API/OuterSpace2.js')).default;
    const { container } = render(<Site />);
    await OuterSpace2.readyUp();

    return{
        container,
        OuterSpace2,
        goto: (page) => {
            const regex = new RegExp(page, 'i');
            fireEvent.click(screen.getByRole('link', { name: regex }));
        },
        textElement: async (text) => {
            return await screen.findByText(new RegExp(text, 'i'));
        },
        checkForText: (text) => {
            return screen.queryByText(new RegExp(text, 'i'));
        },
        assertText: (text) => {
            return screen.getByText(new RegExp(text, 'i'));
        },
        async wait(sec){
            return new Promise(res => setTimeout(res, sec * 1000));
        },

        getInput(id){
            id = toSafeId(id);
      
            // perfect match
            let el = this.container.querySelector(`#${id}`);
            if (el) return el;
        
            // case-insensitive exact match
            el = Array.from(this.container.querySelectorAll('[id]'))
              .find(e => e.id.toLowerCase() === id.toLowerCase());
            if (el) return el;
        
            // case-insensitive partial match
            el = Array.from(this.container.querySelectorAll('[id]'))
              .find(e => e.id.toLowerCase().includes(id.toLowerCase()));
            return el || null;
        },

        clickBtn(id){
            fireEvent.click(this.getInput(id));
        },

        editText(id, text){
            fireEvent.change(
                this.getInput(id),
                { target: { value: text } }
            );
        }
    };
}
