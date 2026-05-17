import {create} from 'zustand'

const useBuildStore = create((set) => ({
    // state
    currentBuild: null,
    selectedParts: {
        frameSet:  null,
        barsStem:  null,
        groupSet:  null,
        wheels:    null,
        tyres:     null,
        seatposts: null,
        saddles:   null,
        bikeFit:   null
    },
    totalPrice: 0,
    // actions
    setPart: (category, part) => set((state) => {
        const updatedParts = {...state.selectedParts, [category]: part }
        const total = Object.values(updatedParts).reduce((sum, p) => sum +(p?.price || 0), 0)
        return { selectedParts: updatedParts, totalPrice: total}
    }),
    removePart: (category) => set((state) => {
        const updatedParts = {...state.selectedParts, [category]: null}
        const total = Object.value(updatedParts).reduce((sum, p) => sum + (p?.price || 0), 0)
        return {selectedParts: updatedParts, totalPrice: total}
    }),
    resetBuild: () => set({
        currentBuild: null,
        selectedParts:{
            frameSet:  null,
            barsStem:  null,
            groupSet:  null,
            wheels:    null,
            tyres:     null,
            seatposts: null,
            saddles:   null,
            bikeFit:   null
        },
        totolPrice: 0
    })
}))

export default useBuildStore