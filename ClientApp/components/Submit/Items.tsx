import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import Card from './Lists/ItemCard'
import Table from './Lists/ItemTable'

export class Item extends React.Component<any, any> {
    constructor() {
        super();
    }

    componentDidMount() {
    }

    public render() {
        const {
            items,
            viewFormat,
            clearFilters
        } = this.props

        return <div>
            {viewFormat == 'cards' &&
                <Card items={items} clearFilters={clearFilters}/>
            }
            {viewFormat == 'table' &&
                <Table items={items} clearFilters={clearFilters}/>
            }
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => ({

    }),
    ({

    })
)(Item as any) as typeof Item;