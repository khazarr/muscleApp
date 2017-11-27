export default {
  modules: {
    navigator: {
      strict: true,
      namespaced: true,
      state: {
        stack: [],
        options: {}
      },
      mutations: {
        push(state, page) {
          state.stack.push(page);
        },
        pop(state) {
          if (state.stack.length > 1) {
            state.stack.pop();
          }
        },
        replace(state, page) {
          state.stack.pop();
          state.stack.push(page);
        },
        reset(state, page) {
          state.stack = [page || state.stack[0]];
        },
        options(state, newOptions = {}) {
          state.options = newOptions;
        }
      }
    },

    splitter: {
      strict: true,
      namespaced: true,
      state: {
        open: false
      },
      mutations: {
        toggle(state, shouldOpen) {
          if (typeof shouldOpen === 'boolean') {
            state.open = shouldOpen;
          } else {
            state.open = !state.open;
          }
        }
      }
    },

    tabbar: {
      strict: true,
      namespaced: true,
      state: {
        index: 1
      },
      mutations: {
        set(state, index) {
          state.index = index;
        }
      }
    },

    workout: {
      state: {
        streches: [
          {
            name : 'Shoulder rolls',
            reps: '5-10x'
          },
          {
            name : 'Scapular shrugs',
            reps: '5-10x'
          },
          {
            name : 'Cat-camels',
            reps: '5-10x'
          },
          {
            name : 'band: straight arm overhead pull downs',
            reps: '5-10x'
          },
          {
            name : 'band: straight arm chest flies',
            reps: '5-10x'
          },
          {
            name : 'band: dislocates',
            reps: '5-10x'
          },
          {
            name : 'wrist mobility exercises',
            reps: '10+'
          }
        ],
        bodyDrills: [
          {
            name: 'Plank',
            time: '10-60s'
          },
          {
            name: 'Side Plank',
            time: '10-60s'
          },
          {
            name: 'Reverse Plank',
            time: '10-60s'
          },
          {
            name: 'Hollow Hold',
            time: '10-60s'
          },
          {
            name: 'Arch Hold',
            time: '10-60s'
          },
        ]
      },
      getters: {
        getStretches (state) {
          return state.streches
        },
        getBodyDrills (state) {
          return state.bodyDrills
        }
      }
    }
  }
};
